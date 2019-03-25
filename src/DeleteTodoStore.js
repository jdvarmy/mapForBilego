import { autorun, observable } from "mobx";

class DeleteTodoStore{
    @observable todos = ['buy milk', 'buy '];
    @observable filter = '';
}

const store = window.store = new DeleteTodoStore();

export default store;

autorun(()=>{
    console.log(store.filter);
    console.log(store.todos[0])
});