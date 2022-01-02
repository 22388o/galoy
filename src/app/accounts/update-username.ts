import { usernameAvailable } from "@app/accounts"
import { UsernameNotAvailableError } from "@domain/accounts"
import { checkedToUsername } from "@domain/users"
import { AccountsRepository } from "@services/mongoose"

export const updateUsername = async ({
  id,
  username,
}: {
  id: string
  username: string
}) => {
  const checkedUsername = checkedToUsername(username)
  if (checkedUsername instanceof Error) return checkedUsername

  const usernameAvail = await usernameAvailable(checkedUsername)
  if (usernameAvail instanceof Error) return usernameAvail
  if (!usernameAvail) return new UsernameNotAvailableError()

  const accountsRepo = AccountsRepository()

  const account = await accountsRepo.findById(id as AccountId)
  if (account instanceof Error) return account

  account.username = checkedUsername
  return accountsRepo.update(account)
}
