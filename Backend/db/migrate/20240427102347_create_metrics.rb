class CreateMetrics < ActiveRecord::Migration[7.1]
  def change
    create_table :metrics do |t|
      t.string :name, null: false
      t.float :value, null: false
      t.timestamp :timestamp, null: false, index: true
    end
  end
end
