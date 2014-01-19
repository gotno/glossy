class AddAttachmentImgToImageWidgets < ActiveRecord::Migration
  def self.up
    change_table :image_widgets do |t|
      t.attachment :img
    end
  end

  def self.down
    drop_attached_file :image_widgets, :img
  end
end
