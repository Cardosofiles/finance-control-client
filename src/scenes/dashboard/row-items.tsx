import { BoxGridLayout } from "@/components/box-grid-layout";
import { useGetKpisQuery } from "@/state/api";

export function RowItemsOne() {
  const { data } = useGetKpisQuery();
  console.log(data);

  return (
    <>
      <BoxGridLayout gridArea="a">a</BoxGridLayout>
      <BoxGridLayout gridArea="b">a</BoxGridLayout>
      <BoxGridLayout gridArea="c">a</BoxGridLayout>
    </>
  );
}

export function RowItemsTwo() {
  return (
    <>
      <BoxGridLayout gridArea="d">a</BoxGridLayout>
      <BoxGridLayout gridArea="e">a</BoxGridLayout>
      <BoxGridLayout gridArea="f">a</BoxGridLayout>
    </>
  );
}
export function RowItemsThree() {
  return (
    <>
      <BoxGridLayout gridArea="g">a</BoxGridLayout>
      <BoxGridLayout gridArea="h">a</BoxGridLayout>
      <BoxGridLayout gridArea="i">a</BoxGridLayout>
      <BoxGridLayout gridArea="j">a</BoxGridLayout>
    </>
  );
}
