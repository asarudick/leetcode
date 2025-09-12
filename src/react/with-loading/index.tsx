import { useEffect, useState } from 'react';
import {withLoading} from './withLoading';

function Example() {
    return <div></div>;
}

export default function () {
    const Wrapped = withLoading(Example, {delay: 100});
    const [data, setData] = useState(false);
    
    useEffect(() => {
        const id = setTimeout(() => setData(true), 100);
        return () => clearTimeout(id);
    }, []);

    return (
        <Wrapped data={data} />
    )
}