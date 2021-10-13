import observe from "./observe";

function defineReactiveData(data,key,value){
    // 访问数组的每一项值
    observe(value);
    Object.defineProperty(data,key,{
        get(){
            console.log('响应式数据：获取',value);
            return value;
        },
        set(newValue){
            console.log('响应式数据：设置',newValue);
            if(newValue === value) return;
            value = newValue;
        }
    })
}

export default defineReactiveData;