import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

// Компонент Watch отображает часы и время
export const Watch = ({ item, onDelet }) => {
    const [hour, setHour] = useState(); // Состояние часов
    const [minute, setMinute] = useState(); // Состояние минут
    const [second, setSecond] = useState(); // Состояние секунд
    let { title, timer } = item; // Получение данных о часах и времени из props

    timer = Number(timer); // Преобразование времени в число

    const deg = 6; // Градус на одну минуту
    const day = new Date(); // Текущая дата и время
    const hours = (day.getUTCHours() + timer) * 30; // Расчет угла для часов
    const minutes = day.getUTCMinutes() * deg; // Расчет угла для минут
    const seconds = day.getUTCSeconds() * deg; // Расчет угла для секунд

    // Обновление времени каждую секунду
    useEffect(() => {
        const interval = setInterval(() => {
            setHour(hours);
            setMinute(minutes);
            setSecond(seconds);
            return () => {
                clearInterval(interval);
            };
        }, 1000);
    }, [hours, minutes, seconds]);

    console.log(hour, minute, second);

    // Вывод компонента с часами и временем
    return (
        <div className='clock-wrapper'>
            <div className='title-wrapper'>
                <button className='clock-btn' onClick={() => onDelet(title)}>
                    x
                </button>
                <h4 className='title'>{title}</h4>
            </div>
            <div className='clock'>
                <div className='hour'>
                    <div
                        className='hour-hand'
                        id='hour-hand'
                        style={{
                            transform: `rotateZ(${hours + minutes / 12}deg)`,
                        }}
                    ></div>
                </div>
                <div className='minutes'>
                    <div
                        className='minute-hand'
                        id='minute-hand'
                        style={{ transform: `rotateZ(${minutes}deg)` }}
                    ></div>
                </div>
                <div className='seconds'>
                    <div
                        className='second-hand'
                        id='second-hand'
                        style={{ transform: `rotateZ(${seconds}deg)` }}
                    ></div>
                </div>
            </div>
        </div>
    );
};

// Проверка свойств компонента
Watch.propTypes = {
    onDelet: PropTypes.func.isRequired, // Функция удаления элемента
    item: PropTypes.shape({
        title: PropTypes.string.isRequired, // Название
        timer: PropTypes.string.isRequired, // Временная зона
    }),
};