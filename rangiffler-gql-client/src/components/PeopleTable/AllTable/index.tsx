import { useState } from "react";
import { PeopleTable } from ".."
import { useQueryPeople } from "../../../hooks/useQueryPeople";

export const AllTable = () => {
    const [page, setPage] = useState(0);
    const {data, hasNextPage, hasPreviousPage} = useQueryPeople({page});

    return (
        <PeopleTable
            data={data}
            page={page}
            setPage={setPage}
            hasNextPage={hasNextPage}
            hasPreviousPage={hasPreviousPage}
        />
    )
}