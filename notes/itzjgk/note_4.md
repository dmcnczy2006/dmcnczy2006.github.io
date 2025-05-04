# 4 Python 语言基础

实际上，教材中已有详细的 Python 语言基础内容，覆盖了数据的输入、处理和输出。在笔记中重复这些内容并没有意义。本节将从 **Python 函数** 角度对 Python 语言基础作出进一步探讨。此外，本节将分享一些 Python 语言的技巧，它们可能在试卷中以陌生代码的形式出现。本节中会出现较多的超纲内容，对高考没有显著的用处，但有助于有一定基础的同学“拔尖”，在模拟考中争取更多的分数。

---

## 4.1 内置函数和类型

### 4.1.1 内置函数和类型说明

内置函数是 Python 提供的一组“默认工具箱”，其中包括 `print()`、`len()`、`int()` 等常用函数。

在 Python 中，`int` 既可以指一个用于将其他数据类型强制转换为整数的函数，也可以指整数数据类型。 `float`、`str`、`list` 等也是如此。这些默认的数据类型被称作内置类型。

回顾数学中对于运算的定义。我们在复数集上定义了四则运算，在整数集上定义了取余等运算。在实数集上，数可以比较大小；但虚数没有大小之分。Python 的运算符与之类似，实际上是被它左右两边的数据类型定义的。也就是说，**运算符的具体实现和功能取决于它所作用的对象类型**。Python 先定义了整数、浮点数、字符串、列表等数据类型，再定义了它们的运算。这些运算符包括但不限于**算数运算符**（如 `+`、`-`、`*`、`/` 等），**比较运算符**（如 `==`、`<`、`>` 等）和**成员运算符**（`in`）。请复习算数运算符和逻辑运算符（`not`、`and`、`or`）的**优先级**。

于是，我们定义字符串之间可以用加号（`+`）进行拼接操作，结果是按顺序连接后的新字符串；但字符串与整数、浮点数等其他类型不能直接相加：

```
>>> "abc" + "def"        # 两个字符串拼接
'abcdef'
>>> "abc" + "d" + "ef"   # 多次拼接结果相同
'abcdef'
>>> 1 + "ab"             # 数字与字符串相加会报错
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
TypeError: unsupported operand type(s) for +: 'int' and 'str'
```

由于输入数据默认是字符串类型，输出时也需拼接字符串，因此**当代码涉及输入输出操作时，必须确认运算符号两边的数据类型**。特别是在解决复杂问题时，即使推导得到了正确的结果，也要注意**输出前可能需要将数值转换为字符串**，否则会导致类型错误。

> 【例题 4.1】 输入三个数，打印输出这三个数的和以及乘积。填写代码：

```python
a, b, c = int(input()), int(input()), int(input())
print("这三个数的和为", 【1】)
print("这三个数的乘积为" + 【2】)
```

**【例题解答】**

  **关键点分析**：
  1. `print("字符串", 数值)` 中逗号会自动转换数值为字符串并用空格分隔。
  2. `"字符串" + 数值` 会报错，必须手动将数值转为字符串。

  **参考答案**：
  - 【1】 填写 `a + b + c`（直接输出数值，逗号自动处理类型）
  - 【2】 填写 `str(a * b * c)`（必须将乘积转为字符串才能拼接）

同样，我们定义列表可以相加，得到的是它们的顺次拼接:

```
>>> [1, 2, 3] + [4] + [5, 6] + [] + [7, 8]
[1, 2, 3, 4, 5, 6, 7, 8]
```

定义字符串可以和整数 n 相乘，得到的是 n 遍重复的原字符串；但是字符串和字符串不可以相乘：

```
>>> "abc" * 3
'abcabcabc'
>>> 3 * "abc"
'abcabcabc'
>>> "abc" * "abc"
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
TypeError: can't multiply sequence by non-int of type 'str'
```

定义列表可以和整数 n 相乘，得到的是 n 遍重复的原列表：

```
>>> [1, 2, 3] * 2
[1, 2, 3, 1, 2, 3]
```

对于整数和浮点数，我们定义了整除和取余。

整除 `//` 与 取余 `%` 运算对负整数和浮点数的处理需特别注意其数学规则：**被除数 = 除数 ✕ 商 + 余数，其中商是整除的结果**。商为数学商的**向下取整**，取余结果**符号与除数符号保持一致**。可以在上机时，使用代码验证： <span style="font-size: smaller;">模拟考</span>

```python
# 负整数的整除向负无穷取整
print(-7 // 3)   # 输出 -3（数学商为-2.333，向下取整为-3）
print(7 // -3)   # 输出 -3（数学商为-2.333，向下取整仍为-3）

# 取余结果符号始终与除数一致
print(-7 % 3)    # 输出 2（因 -7 = (-3)*3 + 2）
print(7 % -3)    # 输出 -2（因 7 = (-3)*(-3) + (-2)）

# 浮点数运算结果仍为浮点型
print(7.5 // 2)  # 输出 3.0（整除结果舍弃小数部分）
print(7.5 % 2)   # 输出 1.5（余数满足 7.5 = 3*2 + 1.5）
```

此外，Python 中内置，表示 “空” 或 “无” 的特殊对象是 `None`。它也是保留字。

### 4.1.2 `str`、`list`、`tuple`、`dict` 补充说明

我们知道，字符串 `str` 是**无法被修改子串**的：

```python
mystring = "ab123fg"
mystring[1] = "0"  # mystring 保持不变
mystring[2:5] = "cde"  # mystring 保持不变
```

但列表 `list` 可以被修改元素或子序列，而且自带 `append()`、`pop()` 等修改方法：

```python
mylist = [1, 2, 3, 4]
mylist[0] = 0     # [0, 2, 3, 4]
mylist[1:3] = ["a", "b"]  # [0, 'a', 'b', 4]
mylist.append(5)  # [0, 'a', 'b', 4, 5]
mylist.pop(0)     # ['a', 'b', 4, 5]
mylist.pop()      # 默认去掉列表最后一项，得到 mylist 为 ['a', 'b', 4]
```

因此，我们可以认为，列表是一种 **“相对可变”** 的数据类型，而字符串 **“相对不可变”** （学名“可哈希 (hashable)”）。同样“相对不可变”的数据类型还有整数、浮点数等。

实际上，Python 也提供了“相对不可变”的有序数据组，叫做 **元组** `tuple`。元组用圆括号定义，支持与列表相似的索引和切片操作，但**无法修改元素或子序列**：

```python
mytuple = (1, "a", [2,3], 4.5)
mytuple[0] = 0        # 报错 TypeError，元素不可修改
mytuple[1:3] = ("b", 5)  # 报错 TypeError，子序列不可修改
mytuple.append(6)     # 报错 AttributeError，无追加方法
```

元组**紧凑的结构特性**使其成为多变量赋值的理想载体。例如：

```python
# 解包赋值
point = (10, 20)
x, y = point          # x=10, y=20

# 快速交换变量值（原理是右侧自动组包为元组）
a, b = 5, 7
a, b = b, a           # 右侧等价于 (b, a) 元组
```

在函数返回时，看似返回多个值的操作本质上是通过元组实现的：

```python
def calculate(a, b):
    return a + b, a * b, a - b  # 返回 (a+b, a*b, a-b) 的元组

sum_result, product_result, diff_result = calculate(3, 2)  # 5, 6, 1
```

需要注意的是，单元素元组必须添加逗号以区别普通括号表达式：

```python
singleton = (42,)     # 正确创建单元素元组
not_a_tuple = (42)    # 实际类型为 int
```

而对于字典 `dict`，我们已经知道它由**键值对**构成，它定义的 `in` 运算符判定特定字段是否存在于字典的**键**中。代码 `for i in mydict:` 遍历了字典所有的键。

字典中**所有的键必须是“相对不可变”的**。也就是说，列表不能作为字典的键（但元组可以）。

---

## 4.2 自定义函数 `def` <span style="font-size: smaller;">学考</span>

当内置函数无法满足特定需求时，可通过 `def` 关键字创建自定义函数。函数定义包含**名称**、**参数列表**和**函数体**。

函数支持返回 `return` 值（就如数学中的 $y=f(x)$ 或 $z=f(x, y)$），例如实现斐波那契数列的函数：

```python
def fibonacci(n):
    # 生成斐波那契数列前n项
    a, b = 0, 1
    result = []
    for i in range(n):
        result.append(a)
        a, b = b, a + b
    return result
```

也可以不返回任何具有意义的值（实际返回 `None`），而与环境进行交互，例如批量打印函数：

```python
def repeat_print(string, n):
    for _ in range(n):  # 下划线 _ 可以作为变量名，表示这个变量不会在后续（循环体中）被使用到
        print(string)
```

当然，也可以把上面两者结合起来：

```python
def fibonacci(n):
    # 生成斐波那契数列前n项
    a, b = 0, 1
    result = []
    for i in range(n):
        result.append(a)
        print("第", i + 1, "次运算的结果为", result)
        a, b = b, a + b
    return result
```

### 4.2.1 默认参数 <span style="font-size: smaller;">学考</span>

定义函数时，可为参数设定默认值，调用时若省略该参数则自动使用默认值。例如，计算商品价格打折后的金额：

```python
def calculate_price(price, discount=0.9):
    # 默认打9折，可传入其他折扣
    return price * discount

print(calculate_price(100))    # 输出 90.0（默认9折）
print(calculate_price(100, 0.8))  # 输出 80.0（8折）
```

**注意**：默认参数必须定义在非默认参数之后，且默认值在函数定义时固定。

### 4.2.2 def 的注释 <span style="font-size: smaller;">模拟考</span>

为增强代码可读性，可通过两种方式为函数添加注释：

1. **文档字符串（Docstring）**：用三引号包裹的字符串，说明函数功能、参数和返回值。例如：

```python
def fibonacci(n):
    """
    生成斐波那契数列前n项
    
    参数：
        n: 需要生成的项数（整数）
    返回值：
        list: 包含前n项的列表
    """
    a, b = 0, 1
    result = []
    for _ in range(n):
        result.append(a)
        a, b = b, a + b
    return result
```

2. **类型提示**：标注参数和返回值的类型。

```python
def calculate_price(price: float, discount: float = 0.9) -> float:
    """计算折扣后的价格"""
    return price * discount
```

为函数添加注释之后，如果使用 VS Code 等集成开发环境，在编写代码调用这些函数的时候会把这些注释显示出来，给编程提供方便。

---

## 4.3 让 Python 函数更像数学函数 <span style="font-size: smaller;">模拟考</span>

**提示：基础不是很好的同学不必阅读此部分。此部分主要针对基础较好的同学，希望他们在模拟考中快速认识陌生代码，从而争得满分。**

数学中我们定义函数 $f(x)$ 后，可以单独讨论 $f$ 的性质（如“二域四性”）。单独的 $f$ 可被传递、讨论和使用，而无需关心它作用的自变量 $x$。 Python 中的函数也具有这种“独立性”——**函数名本身就是一个可操作的对象**，就像数学中的函数符号 $f$ 一样。例如数学中 $g=f$ 后，$g(x)$ 和 $f(x)$ 完全等价，类似地，Python **函数可被赋值传递**。函数名可以像普通变量一样赋值、传递，甚至改名：  

```python
def greet(name):
    return "Hello, " + name + "!"

say_hi = greet  # 将函数赋值给新变量（类似数学中 f=g）
print(say_hi("Alice"))  # 输出 "Hello, Alice!"（等价于 greet("Alice")）
```

更令人叹为观止的是，**函数可以作为其他函数的输入参数或是输出返回值**。将函数作为参数传递类似于数学中的复合函数 $f(g(x))$，只要定义了 $f(u)$ 和 $g(t)$ 我们便能知道 $f(g(x))$：

```python
# 示例：将函数作为参数传递（类似数学中的复合函数 f(g(x))）
# 定义 f(g(x)) = 2 * g(x)，g 由外部传入，x 是自变量
def cube(t):  # 返回 t 的立方
    return t ** 3

def f(g, x):
    return 2 * g(x)

result = f(cube, 2)  # 计算 f(cube(2)) = 2 * cube(2) = 2 * 2**3
print(result)  # 输出 16
```

函数返回另一个函数的示例如下：

```python
# 示例：函数返回另一个函数（类似数学中的“函数生成器”）
def create_multiplier(n):
    def multiplier(x):
        return x * n
    return multiplier

double = create_multiplier(2)  # 生成一个“乘以2”的函数
print(double(5))  # 输出 10
```

上述知识为模拟考中时常出现的 `lambda`、`map` 等陌生代码做出了充足的准备。

### 4.3.1 匿名函数 `lambda`

`lambda` 用于快速定义**临时小函数**，语法如 `lambda 参数: 表达式`。

**类比**：数学中定义 $f(x)=x^2$，其中的 $f$ 可以直接写成 `lambda x: x**2` （也可以写成 `lambda t: t**2`），无需完整地通过 `def` 来定义。  

```python
# 示例：定义平方函数
square = lambda x: x**2  # （等价于 def square(x): return x**2）
print(square(3))  # 输出 9
```

当然，`lambda` 只能写一行表达式，不能包含复杂逻辑。复杂功能仍需用 `def` 定义。

### 4.3.2 `map` 函数

`map` 函数实现批量处理数据，**将函数依次应用到列表的每个元素**。

**语法**：`map(函数, 列表等)` 返回一个可迭代对象。它不能直接显示，需用 `list()` 转为列表。  

```python
# 示例 1：将字符串列表转为大写
def to_upper(ch):
    return chr(ord(ch) - 32)

result = map(to_upper, ["a", "b", "c"])
print(list(result))  # 输出 ['A', 'B', 'C']

# 示例 2：配合 lambda 计算平方（模拟考典型题）
numbers = [1, 2, 3]
squares = map(lambda x: x**2, numbers)
print(list(squares))  # 输出 [1, 4, 9]
```

掌握上述知识后，可以再次回顾在做 OJ 时常用的代码块 `list(map(int, input().split()))` 具体的意思。

> 【例题 4.2】 若 `data = [2, 3, 4]`，写出以下代码的输出：

```python
func = lambda x: "偶数" if x % 2 == 0 else "奇数"  # 对“三元表达式”的详解见后文
print(list(map(func, data)))
```
**答案**：`['偶数', '奇数', '偶数']`

**解析**：`lambda` 根据数字奇偶性返回字符串，`map` 批量处理列表元素。

> 【例题 4.3】 写出以下代码的输出：

```python
actions = [lambda x: x + 1, lambda x: x * 2]
result = actions[1](5)
print(result)
```

**答案**：10

**解析**：调用第二个 lambda 函数，5\*2=10。

---

## 4.4 简洁表达式技巧

Python 提供了两种高效工具简化代码，其设计理念与数学表达式高度相似。

### 4.4.1 三元表达式：一行搞定条件判断

**语法**：`结果A if 条件 else 结果B`  

**类比**：类似数学中的分段函数 $f(x) = \begin{cases} x+1 & x>0 \\ 0 & \text{其他} \end{cases}$，但压缩为一行。

```python
# 示例 1：判断数字奇偶性（常规写法 vs 三元表达式）
# 常规写法
if num % 2 == 0:
    tag = "偶数"
else:
    tag = "奇数"

# 三元表达式简化版
tag = "偶数" if num % 2 == 0 else "奇数"

# 示例 2：取两数较大值
a, b = 7, 5
max_value = a if a > b else b  # 结果为 7
```

### 4.4.2 列表推导式：批量生成数据

**语法**：`[表达式 for 变量 in 可迭代对象]`  

**类比**：类似数学中的集合描述 $\{x^2 \mid x \in \{1,2,3\}\}$，但用代码实现。

此外，列表推导式还有一个惊喜功能：在它的后面加上 `if` 条件判断，可以实现筛选。

```python
# 示例 1：生成平方数列表（常规循环 vs 列表推导式）
# 常规循环
squares = []
for i in range(5):
    squares.append(i**2)

# 列表推导式简化版
squares = [i**2 for i in range(5)]  # 输出 [0, 1, 4, 9, 16]

# 示例 2：筛选正数（结合条件判断）
numbers = [3, -1, 4, -5]
positive = [x for x in numbers if x > 0]  # 输出 [3, 4]
```

---

## 4.5 编程解决简单问题 <span style="font-size: smaller;">学考</span>

编程解决简单问题是学考的压轴题，也是选考的第一道大题，考察基础编程能力。选考的简单问题，需要配合日常的联系，“稳、准、狠”地拿下。

---

## 4.6 转义字符、r 字符串、格式化字符串 <span style="font-size: smaller;">模拟考</span>

在 Python 中，字符串处理支持**转义字符**，用于表示特殊符号或不可见字符。以反斜杠 `\` 开头实现特定功能：

```python
# 常见转义字符
print("换行符：第一行\n第二行")          # \n 换行
print("双引号：\"Hello\"")             # \" 保留双引号
print("反斜杠本身：C:\\User\\file")     # \\ 表示单个反斜杠
```

当需要**禁用转义**时，可在字符串前添加 `r` 或 `R` 声明为原始字符串，常用于正则表达式或文件路径：

```python
# 原始字符串保持反斜杠字面意义
path = r"C:\User\data\new_folder"  # 无需双写反斜杠
print(path)  # 输出 C:\User\data\new_folder
```

字符串格式化提供**动态插入变量**的能力，推荐使用 **f-字符串**，以 `f` 或 `F` 开头，用 `{}` 包裹变量或表达式：

```python
# f-string 基本用法
name = "Alice"
age = 25
print(f"{name}今年{age}岁")  # 输出 Alice今年25岁

# 支持表达式和格式控制
price = 19.99
print(f"总价：{price * 3:.2f}元")  # 总价：59.97元（保留两位小数）

# 多行 f-string（注意每行需单独添加 f 前缀）
message = (
    f"姓名：{name}\n"
    f"年龄：{age}\n"
    f"余额：{price:.1f}元"
)
```

另外，**`%` 运算符**是传统的字符串格式化工具，通过占位符将变量嵌入字符串。基本语法为 `"格式化字符串" % (变量)`，其中占位符以 `%` 开头表示数据类型：

```python
# 基础用法：单变量
name = "Bob"
print("Hello, %s!" % name)  # 输出 Hello, Bob!（%s 表示字符串）

age = 30
print("年龄：%d 岁" % age)   # 输出 年龄：30 岁（%d 表示整数）

price = 9.988
print("价格：%.2f 元" % price)  # 输出 价格：9.99 元（%.2f 保留两位小数）
```

多变量需按顺序传入**元组**，占位符与变量一一对应：

```python
# 多变量按顺序匹配
x, y = 5, 7
print("%d + %d = %d" % (x, y, x+y))  # 输出 5 + 7 = 12

# 混合类型示例
user_info = ("Alice", 25, 160.51)
print("姓名：%s，年龄：%d，身高：%.1fcm" % user_info)  
# 输出 姓名：Alice，年龄：25，身高：160.5cm
```

常见占位符：
- `%s`：字符串（自动将非字符串转为字符串）
- `%d`：整数
- `%f`：浮点数（可指定精度，表示四舍五入到第几位小数，如 `%.3f`）
- `%%`：表示百分号本身（转义）

---

## 本节要点
