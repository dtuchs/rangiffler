import { useState } from "react";
import { PeopleTable } from "..";
import { useGetInvitations } from "../../../hooks/useGetInvitations";

export const InvitationsTable = () => {
    const [page, setPage] = useState(0);
    const {data, hasNextPage, hasPreviousPage} = useGetInvitations({page});

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