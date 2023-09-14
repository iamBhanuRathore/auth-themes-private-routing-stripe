import { getServerSession } from "next-auth/next"

import { authOption } from "./auth"

export async function getCurrentUser() {
    const session = await getServerSession(authOption)

    return session?.user
}
