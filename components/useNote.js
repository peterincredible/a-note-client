import useSwr from "swr";
import myaxios from "./myaxios";

function useNote(user){
    async function fetcher(url){
        try{
            let data = await myaxios.get(url);
            data = data.data
            console.log(data);
            return data;
    
        }catch(e){
            console.log("error in the usenote fetcher ");
        }
    }

    
    let {data,error,mutate} = useSwr(user? "/api/items":null,fetcher);
    let notes = data;
    let noteLoading = !notes && !error;

    return {notes,noteLoading,error,mutate};
}

export default useNote;

