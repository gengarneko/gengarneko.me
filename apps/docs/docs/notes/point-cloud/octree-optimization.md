# 八叉树优化

## 基本概念

八叉树 (`Octree`) 是一种三维空间划分的树形数据结构，它递归地将空间分成八个相等的子空间。

通常用于单位点云的空间划分，加速空间查询。

八叉树的非空叶子节点包含一个或多个落在同一空间分区内的点。

想象一个魔方被三个互相垂直的平面切割：

- 上下平面 (XZ平面) → 将Y轴分成两部分
- 左右平面 (YZ平面) → 将X轴分成两部分
- 前后平面 (XY平面) → 将Z轴分成两部分

![input points](https://www.open3d.org/docs/latest/_images/tutorial_geometry_octree_3_1.png)
input

![octree division](https://www.open3d.org/docs/latest/_images/tutorial_geometry_octree_3_3.png)
octree division

> 图片：[Open3D Documentation - Octree](http://www.open3d.org/docs/release/tutorial/geometry/octree.html)

开源项目中，[potree](https://github.com/potree/potree) 以及 [Skye](https://github.com/m-schuetz/Skye) 这样的需要**实时渲染大规模点云**的项目，都使用了 `Octree` 作为它们的加速结构。

### 结构优势

假设我们有 10000 个点：

- 暴力搜索：查找最近点：O(n) = 10000 次比较，一次性加载所有点到显存中
- `Octree`：查找最近点：O(log n) ≈ 13 次节点访问，按需加载视椎体中的点 (但是需要额外存储树形结构)

根据这样的特性我们可以知道他适合的使用场景

### 应用场景

1. **大规模点云**

   - 百万级以上点云数据：一辆自动驾驶车采集的单帧激光雷达数据约有 100-300 万点
   - 需要实时渲染：需要保持稳定的帧率 (通常 ≥30fps)，要求快速的视图刷新和响应
   - 频繁的空间查询：碰撞检测、最近邻搜索、空间过滤

2. **动态场景**

   - 视角经常变化：富交互场景，频繁的相机位置变更
   - 需要局部更新：编辑操作导致的局部变化
   - 内存受限：需要处理超出内存大小的数据集，渲染在移动设备

3. 不适用于
   - 小规模数据：树形结构有额外的计算和存储开销
   - 静态视角：直接加载全部数据更加简单

:::info
就像排序算法一样，在数据规模较小时，简单算法可能比复杂算法更高效
:::

使用八叉树的核心优势：

1. 🚀 查询性能从 O(n) 提升到 O(log n)
2. 💾 内存使用从固定全量变为动态按需
3. 📊 渲染性能从全量检查变为区域检查
4. 🔄 支持动态加载和更新

### 代码示例

可以通过 [sparse-octree](https://github.com/vanruesc/sparse-octree) 的来简单了解一下结构：

```js fileName="sparse-octree"
export class Octree implements Tree, Iterable<Node> {
  protected root: Node;

  // ...

  get min()

  get max()

  get children()

  getCenter(result: Vector3): Vector3 {
    return this.root.getCenter(result);
  }

  getDimensions(result: Vector3): Vector3 {
    return this.root.getDimensions(result);
  }

  cull(region: Frustum | Box3): Node[] {
    const result: Node[] = [];
    cull(this.root, region, result);
    return result;
  }

  getDepth(): number {
    return getDepth(this.root);
  }

  findNodesByLevel(level: number): Node[] {
    const result: Node[] = [];
    findNodesByLevel(this.root, level, 0, result);
    return result;
  }

  getIntersectingNodes(raycaster: Raycaster): Node[] {
    return OctreeRaycaster.intersectOctree(this.root, raycaster.ray);
  }

  leaves(region: Frustum | Box3 | null = null): Iterator<Node> {
    return new OctreeIterator(this.root, region);
  }

  [Symbol.iterator](): Iterator<Node> {
    return new OctreeIterator(this.root);
  }
}
```

## 实现策略

### 空间划分

- 使用八叉树进行空间划分
- 每个节点存储不同精度的点云数据 (采样)
- 支持快速空间查询

```typescript
class OctreeNode {
  bounds: BoundingBox;
  points: Point[];
  children: OctreeNode[];
  level: number;
  subdivide() {
    // 将节点划分为8个子节点
    this.children = new Array(8).fill(null).map(() => new OctreeNode());
    // 根据空间位置分配点到子节点
    this.points.forEach((point) => {
      const childIndex = this.getChildIndex(point);
      this.children[childIndex].points.push(point);
    });
  }
}
```

### 多分辨率展示

```js
interface PointCloudNode {
  // 节点数据
  data: {
    position: Float32Array; // 点位置
    color: Uint8Array; // 点颜色
    normal: Float32Array; // 法向量
  };
  // LOD 信息
  lod: {
    error: number; // 简化误差
    spacing: number; // 点间距
    density: number; // 点密度
  };
}
```

### 动态加载策略

```typescript
class LODLoader {
  private loadQueue: PriorityQueue<PointCloudNode>;
  updateLoadQueue(camera: Camera) {
    this.nodes.forEach((node) => {
      const priority = this.calculatePriority(node, camera);
      if (this.shouldLoad(node, priority)) {
        this.loadQueue.push(node, priority);
      }
    });
  }
  private calculatePriority(node: PointCloudNode, camera: Camera): number {
    const distance = node.boundingBox.distanceTo(camera.position);
    const screenSize = this.calculateScreenSize(node, camera);
    return screenSize / distance;
  }
}
```

## 性能优化

### 视锥体裁剪

```typescript
class FrustumCuller {
  cullNodes(nodes: PointCloudNode[], frustum: Frustum): PointCloudNode[] {
    return nodes.filter((node) => {
      return frustum.intersectsBox(node.boundingBox);
    });
  }
}
```

### 内存管理

```typescript
class MemoryManager {
  private maxMemoryUsage: number = 1000 1024 1024; // 1GB
  private loadedNodes: Map<string, PointCloudNode> = new Map();
  unloadLeastUsedNodes() {
    const sortedNodes = Array.from(this.loadedNodes.entries()).sort(
      (a, b) => a[1].lastUsed - b[1].lastUsed,
    );
    while (this.getCurrentMemoryUsage() > this.maxMemoryUsage) {
      const [nodeId] = sortedNodes.shift();
      this.unloadNode(nodeId);
    }
  }
}
```

### GPU 渲染优化

```typescript
class PointCloudRenderer {
  private shaderProgram: WebGLProgram;
  updatePointSize(camera: Camera) {
    const gl = this.gl;
    const uniformLocation = gl.getUniformLocation(
      this.shaderProgram,
      'pointSize',
    );
    // 根据距离动态调整点大小
    const size = this.calculatePointSize(camera.position);
    gl.uniform1f(uniformLocation, size);
  }
}
```

## 实际应用

### 动态LOD选择

```typescript
class LODSelector {
  selectLOD(node: PointCloudNode, camera: Camera): LODLevel {
    const distance = node.boundingBox.distanceTo(camera.position);
    const screenSize = this.calculateScreenSize(node, camera);
    return this.levels.find(
      (level) =>
        distance > level.distance && screenSize < level.screenThreshold,
    );
  }
}
```

### 渐进式加载

```typescript
class ProgressiveLoader {
  async loadNode(node: PointCloudNode): Promise<void> {
    // 1. 先加载低分辨率数据
    await this.loadLowResolution(node);
    // 2. 显示低分辨率点云
    this.renderer.addPoints(node.lowResData);
    // 3. 异步加载高分辨率数据
    this.loadHighResolution(node).then(() => {
      // 4. 平滑过渡到高分辨率
      this.renderer.transition(node);
    });
  }
}
```

## 性能指标

### 1. 渲染性能

- 帧率（FPS）保持在 60+
- 点云渲染延迟 < 16ms
- GPU 内存使用 < 2GB

### 2. 加载性能

- 初始加载时间 < 1s
- LOD 切换延迟 < 100ms
- 内存使用峰值 < 4GB

## 最佳实践

1. **预处理优化**

   - 提前计算 LOD 层级
   - 优化点云数据结构
   - 压缩存储格式

2. **运行时优化**

   - 动态调整点大小
   - 智能内存管理
   - 异步数据加载

3. **用户体验**
   - 平滑的 LOD 过渡
   - 渐进式加载反馈
   - 性能监控和调试
