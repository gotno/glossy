class AddAttachmentImgToImageWidgets < ActiveRecord::Migration
  def self.up
    change_table :widget_images do |t|
      t.attachment :img
    end
  end

  def self.down
    drop_attached_file :widget_images, :img
  end
end
