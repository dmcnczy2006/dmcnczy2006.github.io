# 5 Python 应用

必修一、必修二教材中对很多 Python 的应用作了讲解，具体有 `pandas`、`jieba`、`matplotlib`、`re`、`flask` 和 `sqlite3` 等。这些 Python 库使得“编程解决问题”不只是简单的字符串输入与输出，而可以**以图表、数据库，乃至网页界面、硬件与现实的交互形式呈现**，大大拓宽了“编程解决问题”的有效范围。本节主要介绍 `pandas`、`jieba`、`matplotlib`、`re` 和 `PIL.Image` 库的相关内容。`pandas` 和 `matplotlib` 需要重点掌握，余下的库了解即可。考虑到大家对“信息系统”这一大块的重点需求，与信息系统关联较强的 `flask`、`sqlite3` 将在“信息系统与应用”部分再行介绍。

运用这些包进行 Python 编程前，需要 import。本节中省略 import 写法并默认笔记中的 import 写法和教材中保持一致。

---

## 5.1 `pandas` —— 数据表分析工具包

### 5.1.0 类及其属性和方法

**数字孪生技术**，简单来说，就是为现实世界中的物理实体（如一台发动机、一座工厂甚至一座城市）在数字虚拟世界中创建一个完全对应的“双胞胎”模型。这个模型不仅仅是静态的外观复制，更是一个能实时映射、模拟并预测其物理实体状态的动态数字实体。

这个过程的核心思想，与编程中“类”的概念高度契合。我们可以将需要构建数字孪生的物理实体（例如，一台风力发电机）看作一个**类**。这个“风力发电机类”定义了它所有核心的**属性**（数据），如当前的转速、功率输出、叶片角度、内部温度、振动频率等，这些属性共同构成了它在数字世界中的状态。同时，这个类还定义了它的**方法**（行为或功能），例如“计算疲劳损耗”、“预测故障”、“调整叶片角度以优化功率”等。

最终，我们为现实世界中每一台具体的风力发电机，都根据这个“类”的蓝图，实例化出一个独立的“数字孪生体**对象**”。这个孪生体通过传感器持续接收其物理本体传来的实时数据，更新自身的属性，并利用其方法进行分析、模拟和决策，从而实现对物理实体的监测、优化和预测性维护。

因此，类是构建数字孪生的理想蓝图，它封装了实体的状态与行为；而对象（或**类的实例**）则是具体化的、与物理实体一一对应的数字孪生体，两者共同体现了从抽象模型到具体实例的数字化映射过程。

回到正题：**类 (Class)** 是 Python 面向对象编程的核心概念，它定义了一种**数据类型**的**属性（数据）** 和**方法（操作）**，相当于创建对象的“蓝图”。Python 中类的定义语句如下：

```python
class 类名:
    def __init__(self, 参数1, 参数2):  # 构造方法
        self.属性1 = 参数1             # 实例属性
        self.属性2 = 参数2
        
    def 方法名(self, 参数):           # 实例方法
        # 方法体
        return 返回值
```

上节提到的**Python 内置类**自身也定义有多种属性和方法，例如：
- `str` 字符串类：具有 `upper()`, `split()`, `replace()` 等方法
- `list` 列表类：具有 `append()`, `pop()`, `sort()` 等方法
- `dict` 字典类：具有 `keys()`, `values()`, `items()` 等方法

```python
# 使用内置类的属性和方法
s = "hello"          # 创建 str 类的实例
print(s.upper())     # 调用方法：输出 "HELLO"

lst = [1, 2, 3]      # 创建 list 类的实例
lst.append(4)        # 调用方法：列表变为 [1, 2, 3, 4]
```

更详细地说，类的属性分为实例属性和类属性。**实例属性**是该类每个对象独有的数据（通过 `self.属性名` 定义），而**类属性**是该类所有对象共享的数据，在类内部直接定义。

2. **方法 (Methods)**：
   - **实例方法**：操作实例属性的函数（第一个参数为 `self`）
   - **构造方法 `__init__`**：创建对象时自动调用，用于初始化属性

```python
class Student:
    # 类属性（所有学生共享）
    school = "第一中学"
    
    def __init__(self, name, score):
        # 实例属性（每个学生独有）
        self.name = name
        self.score = score
    
    # 实例方法
    def get_grade(self):
        if self.score >= 90:
            return "优秀"
        else:
            return "合格"


stu1 = Student("张三", 85)  # 创建类的实例（对象）
print(stu1.name)          # 获取属性："张三"
print(stu1.get_grade())   # 调用方法："合格"
print(stu1.school)        # 获取类属性："第一中学"
```

### 5.1.1 `Series` 和 `DataFrame` 的属性

前面已经讲到类具有“属性”和“方法”。我们知道 `pandas` 定义了两种类：**一维的 `Series` 和二维的 `DataFrame`**。这两种数据类型可以理解为**带有智能索引和标签的数组或表格**。

**`Series` 核心属性**：
- `values`：获取底层数据（NumPy 数组形式）
- `index`：获取索引对象（默认0起始整数索引）
- `name`：序列名称（可选）

```python
s = pd.Series([10, 20, 30], index=['a', 'b', 'c'], name='分数')
print(s.values)  # [10 20 30]
print(s.index)   # ['a', 'b', 'c']
print(s.name)    # '分数'
```

**`DataFrame` 核心属性**：
- `columns`：列名索引（表头）
- `index`：行索引
- `values`：二维数据数组
- `shape`：表格形状（行数，列数）
- `dtypes`：各列数据类型

```python
data = {'姓名': ['张三', '李四'], '成绩': [85, 92]}
df = pd.DataFrame(data)
print(df.columns)  # ['姓名', '成绩']
print(df.index)    # [0, 1]（默认整数索引）
print(df.values)   # [['张三', 85], ['李四', 92]]
print(df.shape)    # (2, 2)
```

> **考试重点**：理解 `Series` 和 `DataFrame` 的关系（`DataFrame` 可看作多个 `Series` 的集合），掌握通过索引访问数据。

### 5.1.2 `Series` 和 `DataFrame` 的算术与逻辑操作

`pandas` 支持向量化运算，**运算符直接作用于每个元素**：

```python
# Series 算术运算
s1 = pd.Series([1, 2, 3])
s2 = pd.Series([10, 20, 30])
print(s1 + s2)  # [11, 22, 33]
print(s1 * 2)   # [2, 4, 6]

# DataFrame 算术运算
df = pd.DataFrame({'A': [1, 2], 'B': [3, 4]})
print(df * 2)
#    A  B
# 0  2  6
# 1  4  8
```

**逻辑运算生成布尔序列/表格**：
```python
# 筛选成绩大于90的行
df = pd.DataFrame({'姓名': ['张三', '李四'], '成绩': [85, 92]})
print(df['成绩'] > 90)  # [False, True]
print(df[df['成绩'] > 90])  # 李四 92
```

**常用方法**：
- `head(n)`：查看前n行
- `describe()`：数值列统计摘要
- `sort_values()`：按值排序
- `apply(func)`：应用自定义函数

> **考试技巧**：掌握布尔索引筛选数据，`apply` 结合自定义函数是高频考点。

### 5.1.3 `groupby` 方法

`groupby` 实现分组聚合，三步操作：
1. 分组（按指定列）
2. 应用聚合函数
3. 合并结果

```python
# 按班级分组求平均成绩
data = {'班级': ['A', 'A', 'B', 'B'], '成绩': [80, 90, 85, 95]}
df = pd.DataFrame(data)

grouped = df.groupby('班级')
print(grouped.mean())
#      成绩
# 班级     
# A    85
# B    90
```

**常用聚合函数**：
- `sum()`：求和
- `mean()`：平均值
- `count()`：计数
- `max()`/`min()`：最大/最小值

> **考试重点**：掌握 `groupby` 结合统计函数解决数据分组汇总问题。

---

## 5.2 `matplotlib` —— Python 制图工具包

### 5.2.1 `plt` 绘图需要的坐标

**基本绘图流程**：
1. 准备x、y坐标数据
2. 调用绘图函数
3. 添加图表元素
4. 显示/保存图表

```python
x = [1, 2, 3]  # X轴坐标
y = [2, 4, 1]  # Y轴坐标

plt.plot(x, y)           # 绘制折线图
plt.xlabel('X轴标签')     # X轴标题
plt.ylabel('Y轴标签')     # Y轴标题
plt.title('示例图表')     # 图表标题
plt.grid(True)           # 显示网格
plt.show()               # 显示图表
```

> **考试提示**：坐标数据需长度一致，掌握基础图表元素设置。

### 5.2.2 `Series` 和 `DataFrame` 的 `plot()` 方法

`pandas` 集成 `plot()` 方法，简化绘图：

```python
# Series 绘图
s = pd.Series([1, 3, 2], index=['a', 'b', 'c'])
s.plot(kind='bar')  # 柱状图
plt.show()

# DataFrame 绘图（多列对比）
df = pd.DataFrame({
    'A': [1, 2, 3],
    'B': [4, 5, 6]
}, index=['X', 'Y', 'Z'])
df.plot(kind='bar')  # 分组柱状图
plt.show()
```

**常用图表类型**：
- `'line'`：折线图（默认）
- `'bar'`：柱状图
- `'barh'`：水平柱状图
- `'pie'`：饼图
- `'scatter'`：散点图

> **考试重点**：掌握 `kind` 参数选择图表类型，理解索引作为坐标轴的映射关系。

---

## 5.3 `jieba` 和中文分词

### 5.3.1 中文分词理论知识

中文分词是将连续汉字序列切分为有独立意义的词语。如：
"我爱编程" → ["我", "爱", "编程"]

### 5.3.2 `jieba` 简单使用 <span style="font-size: smaller;">模拟考</span>

```python
import jieba

text = "学考Python编程很有趣"
words = jieba.lcut(text)  # 精确模式分词
print(words)  # ['学考', 'Python', '编程', '很', '有趣']

# 词频统计（模拟考典型题）
from collections import Counter
word_counts = Counter(words)
print(word_counts.most_common(3))  # 出现频率最高的3个词
```

> **考试要求**：掌握基础分词方法，了解词频统计的基本操作。

---

## 5.4 `PIL.Image` —— 简单图像处理 <span style="font-size: smaller;">模拟考</span>

`PIL` (Python Imaging Library) 提供基本图像处理功能：

```python
from PIL import Image

# 1. 打开图片
img = Image.open('test.jpg')

# 2. 获取图片信息
width, height = img.size  # 图片尺寸
mode = img.mode          # 颜色模式（如 'RGB'）

# 3. 裁剪图片（左，上，右，下）
box = (100, 100, 400, 400)  # 裁剪区域坐标
cropped = img.crop(box)

# 4. 保存图片
cropped.save('cropped.jpg')
```

**重要参数格式**：
- 坐标：(左, 上, 右, 下)
- 颜色：(R, G, B) 元组

> **考试提示**：掌握图片裁剪、尺寸获取和保存操作，注意坐标参数顺序。

---

## 5.5 `re` —— 用正则表达式进一步实现字符串处理 <span style="font-size: smaller;">模拟考</span>

正则表达式实现高级字符串匹配：

```python
import re

text = "联系电话：123-4567-8900，备用：987654321"

# 1. 查找所有电话号码
phones = re.findall(r'\d{3,4}-\d{4}-\d{4}', text)
print(phones)  # ['123-4567-8900']

# 2. 替换敏感信息
new_text = re.sub(r'\d{3}-\d{4}-\d{4}', '***-****-****', text)
print(new_text)  # "联系电话：***-****-****，备用：987654321"
```

**常用元字符**：
- `\d`：匹配数字（等价于[0-9]）
- `\w`：匹配字母、数字、下划线
- `.`：匹配任意字符（除换行符）
- `*`：匹配前一个字符0次或多次
- `+`：匹配前一个字符1次或多次

> **考试要求**：掌握 `re.findall()` 和 `re.sub()` 基础用法，理解常见元字符含义。

---

## 本节小结

1. **`pandas` 核心**：
   - `Series`/`DataFrame` 属性（`values`, `index`, `columns`）
   - 向量化运算与布尔索引
   - `groupby` 分组聚合

2. **`matplotlib` 绘图**：
   - 基础绘图流程（数据 → 绘图 → 标注 → 显示）
   - `plot()` 方法快速绘图（`kind` 指定图表类型）

3. **其他库要点**：
   - `jieba.lcut()` 中文分词
   - `PIL.Image` 图片裁剪（坐标元组 `(左,上,右,下)`）
   - `re.findall()`/`re.sub()` 正则匹配（掌握 `\d`, `*`, `+`）

4. **考试策略**：
   - `pandas` 重点掌握数据筛选和分组统计
   - `matplotlib` 熟练基础图表绘制
   - 其他库了解典型应用场景即可
