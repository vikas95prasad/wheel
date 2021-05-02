class AddColumnsToNotes < ActiveRecord::Migration[6.0]
  def change
    add_column :notes, :status, :integer, default: 0
    add_column :notes, :due_date, :datetime
  end
end
