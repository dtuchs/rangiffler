import { useState } from "react";
import { PeopleTable } from "..";
import { useGetFriends } from "../../../hooks/useGetFriends";

export const FriendsTable = () => {
    const [page, setPage] = useState(0);
    const {data, hasNextPage, hasPreviousPage} = useGetFriends({page});

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