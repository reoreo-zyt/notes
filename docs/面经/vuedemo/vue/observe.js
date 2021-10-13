import Observer from './observer';

function observe(data) {
    if(typeof data !== 'object' || data === null) return;
    
    // 观察者
    return new Observer(data);
}

export default observe;
