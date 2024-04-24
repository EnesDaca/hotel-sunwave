import supabase, { supabaseUrl } from "./supabase";

export async function getRooms() {
  const { data, error } = await supabase.from("rooms").select("*");

  if (error) {
    console.error(error);
    throw new Error("Rooms cannot be loaded!");
  }

  return data;
}

export async function createEditRoom(newRoom, id) {
  const hasImagePath = newRoom.image?.startsWith?.(supabaseUrl);

  const imageName = `${Math.random()}-${newRoom.image.name}`.replaceAll(
    "/",
    ""
  );
  // if hasImagePath, use newRoom image, and if not, create a new one based on that new one
  const imagePath = hasImagePath
    ? newRoom.image
    : `${supabaseUrl}/storage/v1/object/public/room-images/${imageName}`;

  // 1. Create/edit room
  let query = supabase.from("rooms");

  // A) CREATE
  if (!id) query = query.insert([{ ...newRoom, image: imagePath }]);

  // B) EDIT
  if (id)
    query = query
      .update({ ...newRoom, image: imagePath })
      .eq("id", id)
      .select();
  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error("Room cannot be created!");
  }
  // 2. Upload image
  if (hasImagePath) return data;

  const { error: storageError } = await supabase.storage
    .from("room-images")
    .upload(imageName, newRoom.image);

  // 3. Delete the room IF there was an error uploading image

  if (storageError) {
    await supabase.from("rooms").delete().eq("id", data.id);
    console.error(storageError);
    throw new Error(
      "Room image could not ne uploaded and the room was not created!"
    );
  }

  return data;
}

export async function deleteRoom(id) {
  const { data, error } = await supabase.from("rooms").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Room cannot be deleted!");
  }

  return data;
}
