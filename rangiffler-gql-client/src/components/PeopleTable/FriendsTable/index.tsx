import {useState} from "react";
import {PeopleTable} from "..";
import {useGetFriends} from "../../../hooks/useGetFriends";

export const FriendsTable = () => {
    const [page, setPage] = useState(0);
    const [search, setSearch] = useState("");

    const handleInputSearch = (value: string) => {
        setSearch(value);
        setPage(0);
    }

    const {data, hasNextPage, hasPreviousPage, refetch} = useGetFriends({page, search});

    const onSearchSubmit = () => {
        refetch();
    }

    return (
        <PeopleTable
            data={data}
            page={page}
            setPage={setPage}
            hasNextPage={hasNextPage}
            hasPreviousPage={hasPreviousPage}
            setSearch={handleInputSearch}
            onSearchSubmit={onSearchSubmit}
        />
    )
}