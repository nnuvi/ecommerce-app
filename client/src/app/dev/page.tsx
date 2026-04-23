import { auth } from "@clerk/nextjs/server";

const TestPage = async () => {
  const { getToken } = await auth();
  const token = await getToken();

    const resProduct = await fetch("http://localhost:8008/health", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const dataProduct = await resProduct.json();
    console.log(dataProduct);

    const resOrder = await fetch("http://localhost:8888/health", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const dataOrder = await resOrder.json();
    console.log(dataOrder);

  // const resPayment = await fetch("http://localhost:8080/health", {
  //   headers: {
  //     Authorization: `Bearer ${token}`,
  //   },
  // });

  // if (!resPayment.ok) {
  //   const errorText = await resPayment.text();
  //   console.log("Payment API error:", errorText);
  //   return;
  // }

  // const dataPayment = await resPayment.json();
  // console.log(dataPayment);

  return <div>Test Page</div>;
};
export default TestPage;
