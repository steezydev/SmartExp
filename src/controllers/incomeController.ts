export default async (ctx: any) => {
  // Enter income wizard
  await ctx.scene.enter('income-wizard')
  return
}