import { useEffect, useRef, useState } from "react";

export const useFetch = (url) => {
    //Mantiene la referencia cuando un componente está montado para mostrarse en pantalla
    const isMounted = useRef(true);
    const [state, setState] = useState({data:null, loading: true, error: null});

    useEffect(()=>{

        //Se dispara cuando mi efecto se desmonte
        return ()=>{
            isMounted.current = false;
        }
    },[]);
    useEffect(()=>{
        setState({
            data: null,
            loading: true,
            error: null
        });
        
        fetch(url)
            .then(resp => resp.json())
            .then(data =>{
                // setTimeout(()=>{
                //     if(isMounted.current){
                //         setState({
                //             loading: false,
                //             error: null,
                //             data
                //         });
                //     }else{
                //         console.log("SetState no se llamó");
                //     }

                // }, 4000);
                if(isMounted.current){
                    setState({
                        loading: false,
                        error: null,
                        data
                    });
                }else{
                    //console.log("SetState no se llamó");
                }
            })
            .catch(()=>{
                setState({
                    data: null,
                    loading: false,
                    error: 'No se pudo cargar la info'
                });
            })
    }, [url]);

    return state;
}
