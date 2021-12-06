import { GT } from "@graphql/index"

import AccountDetailPayload from "@graphql/admin/types/payload/account-detail"
import AccountStatus from "@graphql/admin/types/scalar/account-status"
import { updateAccountStatus } from "@app/accounts/update-account-status"

const AccountUpdateStatusInput = new GT.Input({
  name: "AccountUpdateStatusInput",
  fields: () => ({
    uid: {
      type: GT.NonNullID,
    },
    status: {
      type: GT.NonNull(AccountStatus),
    },
  }),
})

const AccountUpdateStatusMutation = GT.Field({
  type: GT.NonNull(AccountDetailPayload),
  args: {
    input: { type: GT.NonNull(AccountUpdateStatusInput) },
  },
  resolve: async (_, args) => {
    const { uid, status } = args.input
    for (const input of [uid, status]) {
      if (input instanceof Error) {
        return { errors: [{ message: input.message }] }
      }
    }

    const account = await updateAccountStatus({ id: uid, status })
    if (account instanceof Error) {
      return { errors: [{ message: account.message }] }
    }
    return { errors: [], accountDetails: account }
  },
})

export default AccountUpdateStatusMutation