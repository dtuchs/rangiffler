import {useState} from "react";
import {PeopleTable} from ".."
import {useQueryPeople} from "../../../hooks/useQueryPeople";

export const AllTable = () => {
    const [page, setPage] = useState(0);
    const [search, setSearch] = useState("");

    const handleInputSearch = (value: string) => {
        setSearch(value);
        setPage(0);
    }

    const {data, hasNextPage, hasPreviousPage, refetch} = useQueryPeople({page, search});

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
            onSearchSubmit={onSearchSubmit}
            setSearch={handleInputSearch}
        />
    )
}