import Test from './components/Test/index'
import Test2 from './components/Test2/index'
import Test3 from './components/Test3/index'

export default function(Vue) {
    Vue.use(Test2)
    Vue.use(Test3)
    Vue.use(Test)
}
// export function test(Vue) {
//     Vue.use(Test)
// }
// export function test2(Vue) {
//     Vue.use(Test2)
// }

// export function test3(Vue) {
//     Vue.use(Test3)
// }

