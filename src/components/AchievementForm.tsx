import React, { useState, useEffect } from 'react';
import { Achievement, AchievementType } from '../types';

interface AchievementFormProps {
  categoryId: string;
  achievement?: Achievement;
  onSave: (achievement: Omit<Achievement, 'id' | 'completed'>) => void;
  onCancel: () => void;
}

export const AchievementForm: React.FC<AchievementFormProps> = ({
  categoryId,
  achievement,
  onSave,
  onCancel,
}) => {
  const [title, setTitle] = useState(achievement?.title || '');
  const [description, setDescription] = useState(achievement?.description || '');
  const [type, setType] = useState<AchievementType>(achievement?.type || 'bronze');
  const [points, setPoints] = useState<5 | 10 | 20>(achievement?.points || 5);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      title,
      description,
      type,
      points,
      categoryId,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-gray-800 p-6 rounded-lg">
      <div>
        <label className="block text-sm font-medium text-gray-300">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300">Type</label>
        <select
          value={type}
          onChange={(e) => setType(e.target.value as AchievementType)}
          className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white"
        >
          <option value="bronze">Bronze</option>
          <option value="gold">Gold</option>
          <option value="diamond">Diamond</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300">Points</label>
        <select
          value={points}
          onChange={(e) => setPoints(Number(e.target.value) as 5 | 10)}
          className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white"
        >
          <option value={5}>5 Points</option>
          <option value={10}>10 Points</option>
        </select>
      </div>

      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-500"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-500"
        >
          Save
        </button>
      </div>
    </form>
  );
};