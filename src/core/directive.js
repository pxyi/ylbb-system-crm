export default (Vue) => {
  Vue.directive('drawer-close', {
    bind(el, binding, vnode, oldVnode) {
      const visibleText = binding.value;
      el.onclick = () => {
        let selectVisible = (instance) => {
          instance[visibleText] !== undefined ? (instance[visibleText] = false) : (instance.$parent && selectVisible(instance.$parent));
        }
        selectVisible(vnode.componentInstance);
      }
    },
    unbind() {
      console.log('unbind')
    }
  })
}