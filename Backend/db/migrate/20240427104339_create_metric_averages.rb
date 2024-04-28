class CreateMetricAverages < ActiveRecord::Migration[7.1]
  def change
    create_enum :timespans, %w[minute hour day]

    create_table :metric_averages do |t|
      t.string :name, null: false
      t.float :average, null: false
      t.enum :timespan, enum_type: :timespans, null: false
      t.timestamp :timestamp, null: false
    end
  end
end
