import { useState } from "react";
import { PeopleTable } from "..";
import { useGetOutcomeInvitations } from "../../../hooks/useGetOutcomeInvitations";

export const OutcomeInvitationsTable = () => {
    const [page, setPage] = useState(0);
    const {data, hasNextPage, hasPreviousPage} = useGetOutcomeInvitations({page});

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