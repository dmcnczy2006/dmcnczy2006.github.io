### 抽象数据类型 (ADT)

**抽象数据类型 (Abstract Data Type, ADT)** 是一种**数学模型**，它定义了一组操作（接口）并描述了这些操作的行为，但**隐藏了具体的实现细节**。

**ADT 的核心思想**：
- **接口与实现分离**：只关心"能做什么"，不关心"如何实现"
- **信息隐藏**：使用方不需要知道内部数据如何存储
- **操作定义**：通过一组明确定义的操作来访问和修改数据

**经典 ADT 示例**：
1. **栈 (Stack)** ADT：
   - 操作接口：`push()`（入栈）, `pop()`（出栈）, `top()`（查看栈顶）, `is_empty()`（判空）
   - 行为特征：后进先出 (LIFO)
   - 实现方式：可以用列表或链表实现

2. **队列 (Queue)** ADT：
   - 操作接口：`enqueue()`（入队）, `dequeue()`（出队）, `front()`（查看队首）, `is_empty()`（判空）
   - 行为特征：先进先出 (FIFO)
   - 实现方式：可以用列表或链表实现

```python
# 栈 ADT 的列表实现
class Stack:
    def __init__(self):
        self.items = []  # 用列表存储数据（实现细节隐藏）
    
    # ADT 接口方法
    def push(self, item):
        self.items.append(item)
    
    def pop(self):
        return self.items.pop()
    
    def top(self):
        return self.items[-1]
    
    def is_empty(self):
        return len(self.items) == 0

# 使用栈 ADT（只需关心接口，不关心内部实现）
s = Stack()
s.push(10)
s.push(20)
print(s.pop())  # 20
```

> **考试重点**：
> - 理解类与对象的关系（类是蓝图，对象是实例）
> - 掌握 `__init__` 方法和 `self` 参数的作用
> - 区分实例属性和类属性
> - 理解 ADT 的接口与实现分离思想
> - 掌握栈和队列的基本操作特性