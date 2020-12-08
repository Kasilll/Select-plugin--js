import {Select} from "./Select/select";
import "./Select/style.scss";

const select = new Select("#select",{
    placeholder: "Выберите пожалуйста элемент",
    data : [
        {id:1, value : 'React'},
        {id:2, value : 'JS'},
        {id:3, value : 'VUE'},
        {id:4, value : 'React native'},
        {id:5, value : 'Next'},
        {id:6, value : 'Nest'},
        {id:7, value : 'Angular'}
    ]
});


window.s = select;