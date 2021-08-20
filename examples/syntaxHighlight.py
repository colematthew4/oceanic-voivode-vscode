@decorator(param=1)
def f(x):
  """
  Syntax Highlighting Demo
  @param x Parameter

  Semantic highlighting:
  Generated spectrum to pick colors for local variables and parameters:
    COLOR#1 SC1.1 SC1.2 SC1.3 SC1.4 COLOR#2 SC2.1 SC2.2 SC2.3 SC2.4 COLOR#3
    COLOR#3 SC3.1 SC3.2 SC3.3 SC3.4 COLOR#4 SC4.1 SC4.2 SC4.3 SC4.4 COLOR#5
  """

  def nested_func(y):
    print(y + 1)

  s = ("Test", 2 + 3, { 'a': 'b' }, f'{x!s:{"^10"}}')  # comment
  f(s[0].lower())
  nested_func(42)

class Foo:
  tags: List[str]

  def __init__(self: Foo):
    byte_string: bytes = b'newline:\n also newline:\x0a'
    text_string = u"Cyrillic R is \u042f. Oops: \u042g"
    self.make_sense(whatever=1)

  def make_sense(self, whatever):
    self.sense = whatever

x = len('abc')
print(f.__doc__)
