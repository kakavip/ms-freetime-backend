import {
  BaseModel,
  Defaults,
  dso,
  Field,
  FieldType,
  Join,
  Model,
  Where,
} from "https://deno.land/x/dso@v1.0.0/mod.ts";

@Model("photos")
class PhotoModel extends BaseModel {
  @Field(
    { type: FieldType.INT, primary: true, length: 11, autoIncrement: true },
  )
  id!: number;

  @Field(
    {
      type: FieldType.STRING,
      length: 30,
      notNull: true,
    },
  )
  refId!: string;

  @Field({
    type: FieldType.STRING,
    length: 500,
    notNull: true,
  })
  url!: string;

  @Field({ type: FieldType.INT, notNull: true })
  user_id!: BigInt;

  @Field({ type: FieldType.BOOLEAN, notNull: true, default: false })
  is_favorited!: boolean;

  @Field({ type: FieldType.INT, notNull: true, default: 0 })
  is_synced!: number;
}

export default PhotoModel;
