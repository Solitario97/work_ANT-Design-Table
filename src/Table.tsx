import {Table, Image, Button, Flex} from "antd";
import {useEffect, useState} from "react";
import axios from "axios";


function _Table() {

    const baseURL = "https://rickandmortyapi.com/api/character";

    const [character, setCharacter] = useState<Character[]>([]);
    const [loading, setLoading] = useState(false);
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const [newRows, setNewRows] = useState<Character[]>([]);

    interface Character {
        id: number;
        name: string;
        status: string;
        species: string;
        gender: string;
        image: string;
    }


    const onSelectedRowChange = (newSelectedRow: React.Key[]) => {
        setSelectedRowKeys(newSelectedRow);
    }

    const onChangeRows = {
        selectedRowKeys,
        onChange: onSelectedRowChange
    }

    const getCharacters = async () => {
        const res = await axios.get(baseURL)
        setCharacter(res.data.results);
    }

    useEffect(() => {
        getCharacters();
    }, []);

    useEffect(()=>{

    },[newRows])

    const characterWithKeys = character.map(item => ({...item, key: item.id}))


    const saveButton = () => {
        setLoading(true)
        setTimeout(()=>{
            setNewRows(prev => [
                ...prev,
                ...characterWithKeys.filter(item=>selectedRowKeys.includes(item.key))
            ]);
            setSelectedRowKeys([])
            setLoading(false)
        },1000)
    }


    const columns = [
        {
            title: "ID",
            dataIndex: "id",
            key: "number",
        },
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Gender",
            dataIndex: "gender",
            key: "gender",
        },
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
        },
        {
            title: "Species",
            dataIndex: "species",
            key: "species",
        },
        {
            title: "Image",
            dataIndex: "image",
            key: "image",
            render: (image:string) => <Image src={image} width={150}/>,
        },
    ]



    return (
        <>
            <Flex justify="center" gap="30px">
                <Table rowSelection={onChangeRows} dataSource={characterWithKeys} columns={columns} />
                <Button loading={loading} type="primary" onClick={saveButton}>Save</Button>
                <Table dataSource={newRows} columns={columns} />
            </Flex>
        </>
    )
}


export default _Table;