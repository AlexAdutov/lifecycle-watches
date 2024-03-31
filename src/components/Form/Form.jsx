import { useState } from 'react';
import '../../styles/Form.css'; // Импорт файла стилей для формы
import { Valid } from './Valid'; // Импорт функции для валидации данных
import { WatchItems } from '../Watch/WatchItems'; // Импорт компонента WatchItems для отображения элементов
import PropTypes from 'prop-types'; // Импорт PropTypes для проверки типов пропсов

// Компонент формы, принимающий массив данных в качестве пропса
export const Form = ({ data }) => {
    // Состояния для хранения значения названия и временной зоны
    const [valueName, setValueName] = useState({
        title: '',
        timer: '',
    });

    // Состояние для хранения массива элементов
    const [items, setItems] = useState(data);

    const { title, timer } = valueName;

    // Функция для изменения массива элементов при добавлении нового элемента
    const changeItems = (elems) => {
        // Проверка валидности данных
        if (!Valid(elems)) {
            return;
        }

        // Проверка наличия элемента с таким же названием или временной зоной
        if (check(valueName, items)) {
            // Добавление нового элемента в массив
            return setItems((prevItems) => [...prevItems, valueName]);
        }
    };

    // Обработчик события отправки формы
    const submitHandler = (e) => {
        e.preventDefault();

        // Изменение массива элементов
        changeItems(valueName);

        // Очистка значений полей формы после отправки
        setValueName({
            title: '',
            timer: '',
        });
    };

    // Обработчик изменения значений в полях формы
    const handleChange = (e) => {
        e.preventDefault();

        // Обновление состояния значения названия или временной зоны
        const { name, value } = e.target;
        setValueName((prevValue) => ({ ...prevValue, [name]: value }));
    };

    // Функция для удаления элемента по его названию
    const DeletElem = (title) => {
        // Фильтрация массива элементов, оставляя только те, у которых название не равно удаляемому
        return setItems(items.filter((e) => e.title !== title));
    };

    // Функция для проверки наличия элемента с таким же названием или временной зоной
    const check = (item, data) => {
        const { title, timer } = item;
    
        // Проверка наличия элемента с таким же названием
        const titleExists = data.some(existingItem => existingItem.title.toLowerCase() === title.toLowerCase());
        // Проверка наличия элемента с такой же временной зоной
        const timerExists = data.some(existingItem => existingItem.timer.toLowerCase() === timer.toLowerCase());
    
        // Если элемент с таким же названием или временной зоной уже существует, выдаем сообщение об ошибке
        if (titleExists || timerExists) {
            alert('Элемент с таким названием или временной зоной уже существует');
            return false;
        }
    
        return true;
    };

    // Возвращаем разметку формы и списка элементов
    return (
        <div className='content-wrapper'>
            {/* Форма для добавления новых элементов */}
            <form action='' className='form' onSubmit={submitHandler}>
                {/* Поле ввода названия элемента */}
                <div className='form-input-title'>
                    <label htmlFor='input-title' className='label-title'>
                        Название
                    </label>
                    <input
                        type='text'
                        id='input-title'
                        name='title'
                        value={title}
                        className='input-title'
                        placeholder='Название часов'
                        onChange={handleChange}
                    />
                </div>
                {/* Поле ввода временной зоны элемента */}
                <div className='form-input-timer'>
                    <label htmlFor='input-timer' className='label-timer'>
                        Временная зона
                    </label>
                    <input
                        type='text'
                        id='input-timer'
                        name='timer'
                        value={timer}
                        className='input-timer'
                        placeholder='Смещение в часах от Гринвича'
                        onChange={handleChange}
                    />
                </div>
                {/* Кнопка для добавления нового элемента */}
                <button className='btn-form'>Добавить</button>
            </form>
            {/* Компонент для отображения элементов */}
            <div className='watch-items-wrapper'>
                <WatchItems data={items} onDelet={DeletElem} />
            </div>
        </div>
    );
};

// Проверка типов пропсов компонента Form
Form.propTypes = {
    data: PropTypes.array.isRequired,
};
