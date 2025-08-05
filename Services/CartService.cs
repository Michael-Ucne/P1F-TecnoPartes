using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using P1F_TecnoPartes.Models;

namespace P1F_TecnoPartes.Services
{
    public class CartService : INotifyPropertyChanged
    {
        private List<CartItem> _items = new();

        public List<CartItem> Items => _items;
        public int TotalItems => _items.Sum(x => x.Quantity);
        public decimal TotalPrice => _items.Sum(x => x.Total);

        public event PropertyChangedEventHandler? PropertyChanged;

        public void AddItem(int id, string name, decimal price, string image)
        {
            var existingItem = _items.FirstOrDefault(x => x.Id == id);
            
            if (existingItem != null)
            {
                existingItem.Quantity++;
            }
            else
            {
                _items.Add(new CartItem
                {
                    Id = id,
                    Name = name,
                    Price = price,
                    Image = image,
                    Quantity = 1
                });
            }

            OnPropertyChanged();
        }

        public void RemoveItem(int id)
        {
            var item = _items.FirstOrDefault(x => x.Id == id);
            if (item != null)
            {
                if (item.Quantity > 1)
                {
                    item.Quantity--;
                }
                else
                {
                    _items.Remove(item);
                }
                OnPropertyChanged();
            }
        }

        public void ClearCart()
        {
            _items.Clear();
            OnPropertyChanged();
        }

        private void OnPropertyChanged()
        {
            PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(string.Empty));
        }
    }
} 