export const SendNotification = async (data, fcm_token) => {
  try {
    const url = "http://192.168.1.228:8007/api/notification-send";
    // const url = "https://notification.hundredapps.co/api/notification-send";

    const body = {
      app_name: "chitchat",
      display: data.display,
      send: data.send,
      member: data.member,
    };

    console.log(body);

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const result = await response.json();

    // for (const e of result.fcm_error) {
    //   const cek = await model_user_devices.findFirst({
    //     where: {
    //       fcm_token: e,
    //     },
    //   });

    //   if (cek) {
    //     const hapus = await model_user_devices.delete({
    //       where: {
    //         unique_id: cek.unique_id,
    //       },
    //     });
    //   }
    // }

    return result;
  } catch (error) {
    console.error("Error sending notificatiosn:", error);
  }
};
