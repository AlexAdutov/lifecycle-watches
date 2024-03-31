// Импорт файла стилей для приложения
import './styles/App.css';

// Импорт компонента Form из директории 'Form'
import { Form } from './components/Form/Form';

// Импорт данных из внешнего файла (предположительно, это данные для формы)
import { data } from '../data/data';

// Основной компонент, отвечающий за отображение приложения
function App() {
    // Возвращаем основную обертку, содержащую компонент Form
    return (
        <div className='main-wrapper'>
            {/* Передача пропса 'data' в компонент Form */}
            <Form data={data} />
        </div>
    );
}

// Экспорт компонента App как компонента по умолчанию
export default App;