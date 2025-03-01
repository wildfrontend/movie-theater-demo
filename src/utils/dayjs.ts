import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

// ES 2015

dayjs.locale('zh-TW');
dayjs.extend(duration);

export default dayjs;
