'use client';
import FileInput from "@/components/FileInput"
import FormField from "@/components/FormField"
import { MAX_THUMBNAIL_SIZE, MAX_VIDEO_SIZE } from "@/constants";
import { getThumbnailUploadInfo, getVideoUploadUrl, saveVideoDetails } from "@/lib/actions/video";
import { useFileInput } from "@/lib/hooks/useFileInput";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useEffect, useState } from "react"

const uploadFileToBunny = (file: File, uploadUrl: string, accessKey: string): Promise<void> => {
    return fetch(uploadUrl, {
        method: "PUT",
        headers: {
            'Content-Type': file.type,
            AccessKey: accessKey
        },
        body: file,
    }).then((response) => {
        if (!response.ok) throw new Error('Upload Failed')
    })
}

const Page = () => {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [videoDuration, setVideoDuration] = useState(0);

    const [formData, setFormData] = useState({
        title: '',
        description: "",
        visibility: "public",
    });

    const video = useFileInput(MAX_VIDEO_SIZE);
    const thumbnail = useFileInput(MAX_THUMBNAIL_SIZE);

    useEffect(() => {
        if (video.duration !== null) { // video.duration !== null || 0
            setVideoDuration(video.duration)
        }
    }, [video.duration])

    const [error, setError] = useState("")

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({ ...prevState, [name]: value }))
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        setIsSubmitting(true);

        try {
            if (!video.file || !thumbnail.file) {
                setError("Please upload video and thumbnail");
                return;
            }

            if (!formData.title || !formData.description) {
                setError("Please fill in all the details");
                return;
            }

            // Get bunny upload url 
            const {
                videoId,
                uploadUrl: videoUploadUrl,
                accessKey: videoAccessKey
            } = await getVideoUploadUrl();
 
            if (!videoUploadUrl || !videoAccessKey) throw new Error('Failed to get video upload credentials');
            
            // Upload video to bunny
            await uploadFileToBunny(video.file, videoUploadUrl, videoAccessKey)

            // Get thumbnail info
            const { objectPath, thumbnailCdnUrl } = await getThumbnailUploadInfo(videoId);

            // Upload thumbnnail via API route
            const thumbnailFormData = new FormData();
            thumbnailFormData.append("file", thumbnail.file);
            thumbnailFormData.append("path", objectPath);

            await fetch('api/upload-thumbnail', {
                method: 'POST',
                body: thumbnailFormData
            })

            console.log("Upload thumbnail to Bunny was successful")
            
            // Upload the thumbnail to bunny
            // const {
            //     uploadUrl: thumbnailUploadUrl,
            //     cdnUrl: thumbnailCdnUrl,
            //     accessKey: thumbnailAccessKey,
            // } = await getThumbnailUploadUrl(videoId);
            // if (!thumbnailUploadUrl || !thumbnailAccessKey || !thumbnailCdnUrl ) throw new Error('Failed to get thumbnail upload credentials');


            // await uploadFileToBunny(thumbnail.file, thumbnailUploadUrl, thumbnailAccessKey);

            // Create a new DB entry for the video details
            await saveVideoDetails({
                videoId,
                thumbnailUrl: thumbnailCdnUrl,
                ...formData,
                visibility: formData.visibility as Visibility,
                duration: videoDuration
            })
            console.log("saveVideo was successful")

            router.push(`/video/${videoId }`)

        } catch (error) {
            console.log("Error submitting form: ", error);
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <div className="wrapper-md page upload-page">
            <h1>Upload a video</h1>

            {error && <div className="error-field">{error}</div>}

            <form className="rounded-20 shadow-10 gap-6 w-full flex flex-col px-5 py-7.5" onSubmit={handleSubmit}>

                <FormField
                    id="title"
                    label="Title"
                    placeholder="Enter a clear and concise video title"
                    value={formData.title}
                    onChange={handleInputChange}
                />
                <FormField
                    id="description"
                    label="Description"
                    placeholder="Describe what this video is about"
                    value={formData.description}
                    as="textarea"
                    onChange={handleInputChange}
                />

                <FileInput
                    id="video"
                    label="Video"
                    accept="video/*"
                    file={video.file}
                    previewUrl={video.previewUrl}
                    inputRef={video.inputRef}
                    onChange={video.handleFileChange}
                    onReset={video.resetFile}
                    type="video"

                />

                <FileInput
                    id="thumbnail"
                    label="Thumbnail"
                    accept="image/*"
                    file={thumbnail.file}
                    previewUrl={thumbnail.previewUrl}
                    inputRef={thumbnail.inputRef}
                    onChange={thumbnail.handleFileChange}
                    onReset={thumbnail.resetFile}
                    type="image"

                />

                <FormField
                    id="visibility"
                    label="Visibility"
                    value={formData.visibility}
                    as="select"
                    options={[
                        { value: 'public', label: 'Public' },
                        { value: 'private', label: 'Private' },
                    ]}
                    onChange={handleInputChange}
                />

                <button type="submit" disabled={isSubmitting} className="submit-button">
                    {isSubmitting ? 'Uploading...' : 'Upload Video'}
                </button>
            </form>
        </div>
    )
}

export default Page