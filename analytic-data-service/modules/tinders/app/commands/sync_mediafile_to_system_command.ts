import { ensureDir, ensureDirSync } from "https://deno.land/std/fs/mod.ts";
import { MEDIA_FILE_DIR } from "../../../../common/contants.ts";
import photo_repo from "../../domain/repositories/photo_repo.ts";
import { dso, Where } from "https://deno.land/x/dso@v1.0.0/mod.ts";

const sync_medifile_to_system_command = async () => {
  await ensureDir(MEDIA_FILE_DIR);

  const photos = await photo_repo.findAll(
    Where.expr("is_synced = 0 and is_favorited != 0"),
  );
  if (photos.length > 0) {
    const synced_photo = photos[0];
    await write_file_url_to_disk(synced_photo.url ?? "", MEDIA_FILE_DIR);

    synced_photo.is_synced = 1;
    await photo_repo.update(synced_photo);
  }
};

const write_file_url_to_disk = async (file_url: string, file_path: string) => {
  const res = await fetch(
    file_url,
  );

  const contentType: Array<String> = (res.headers.get("content-type") ?? "")
    .split("/");

  if (contentType.length > 1 && contentType[0] === "image") {
    const imageBytes = new Uint8Array(await res.arrayBuffer());
    await Deno.writeFile(
      `${file_path}/synced_image_${Date.now()}.${contentType[1]}`,
      imageBytes,
    );
  }
};

export default sync_medifile_to_system_command;
