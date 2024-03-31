import { Watch } from './Watch'; // Импорт компонента Watch
import '../../styles/Watch.css' // Импорт стилей для Watch
import PropTypes from 'prop-types'; // Импорт PropTypes для проверки свойств

// Компонент WatchItems отображает список часов
export const WatchItems = ({ data, onDelet }) => {
    return (
        <div className='watch-items'>
            {data.map((item) => {
                return <Watch item={item} key={item.title} onDelet={onDelet} />; // Отображение каждого элемента списка часов
            })}
        </div>
    );
};

// Проверка свойств компонента WatchItems
WatchItems.propTypes = {
  onDelet: PropTypes.func.isRequired, // Функция удаления элемента
  data: PropTypes.array.isRequired, // Массив данных о часах
}
