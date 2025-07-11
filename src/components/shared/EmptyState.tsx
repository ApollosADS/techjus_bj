// src/components/shared/EmptyState.jsx
export const EmptyState = ({ 
    title = "Aucun résultat", 
    description = "Aucun élément trouvé pour le moment.",
    icon = "📭"
  }) => {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">{icon}</div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-500 max-w-md mx-auto">{description}</p>
      </div>
    );
  };

export default EmptyState;