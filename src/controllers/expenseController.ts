export default async (ctx: any) => {
  // Enter expense wizard
  await ctx.scene.enter('expense-wizard')
  return
}