const obj = new DefaultObject({ x: 123 }, (key) => 'fallback');
const descriptor = Object.getOwnPropertyDescriptor(obj, 'x');
if (
  descriptor &&
  descriptor.configurable === true &&
  descriptor.enumerable === true &&
  descriptor.value === 123 &&
  descriptor.writable === true
) {
  console.log('Descriptor válido');
}