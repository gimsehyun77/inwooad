import MessageService from "coolsms-node-sdk";

const messageService = new MessageService(
  process.env.SOLAPI_API_KEY!,
  process.env.SOLAPI_API_SECRET!
);

export async function sendAdminSms(order: {
  customer_name: string | null;
  phone: string | null;
  project_type: string | null;
  order_number: string | null;
}) {
  await messageService.sendOne({
      to: process.env.ADMIN_PHONE!,
      from: process.env.SOLAPI_SENDER!,
      type: "LMS",
      text: `[인우애드]

새 주문이 접수되었습니다.

주문번호: ${order.order_number || "-"}
고객명: ${order.customer_name || "-"}
상품: ${order.project_type || "-"}
연락처: ${order.phone || "-"}`,
      autoTypeDetect: false
  });
}