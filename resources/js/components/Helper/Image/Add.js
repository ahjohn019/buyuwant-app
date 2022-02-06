const onSubmitImage = async imgObject => {
    try {
        const formData = new FormData();
        const cloud_name_id = process.env.MIX_CLOUDINARY_NAME;
        const cloud_upload_preset = process.env.MIX_CLOUDINARY_UPLOAD_PRESET;

        formData.append("file", imgObject.img_object);
        formData.append("upload_preset", cloud_upload_preset);
        const res = await fetch(
            `https://api.cloudinary.com/v1_1/${cloud_name_id}/image/upload`,
            {
                method: "POST",
                body: formData
            }
        ).then(response => response.json());

        return res;
    } catch (error) {
        console.error(error);
    }
};

export default onSubmitImage;
