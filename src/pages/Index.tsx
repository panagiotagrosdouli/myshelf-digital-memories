import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ShelfCategory } from "@/components/ShelfCategory";
import { ShelfCard } from "@/components/ShelfCard";
import { AddItemDialog } from "@/components/AddItemDialog";
import { Search, BookOpen, Sparkles } from "lucide-react";
import heroShelf from "@/assets/hero-shelf.jpg";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [items, setItems] = useState([
    {
      id: "1",
      title: "The Bear",
      description: "Σειρά που πρότεινε η Μαρία - comedy-drama για chef",
      category: "Σειρές",
      tags: ["κωμωδία", "drama", "μαγείρεμα"],
      priority: "high" as const,
      status: "wishlist" as const,
      addedDate: new Date("2024-01-15")
    },
    {
      id: "2",
      title: "Atomic Habits",
      description: "Βιβλίο για συνήθειες που θέλω να διαβάσω",
      category: "Βιβλία",
      tags: ["self-help", "productivity", "habits"],
      priority: "medium" as const,
      status: "wishlist" as const,
      addedDate: new Date("2024-01-10")
    },
    {
      id: "3",
      title: "Funky Gourmet",
      description: "Εστιατόριο fine dining που είπε ο Γιάννης",
      category: "Εστιατόρια",
      tags: ["fine-dining", "αθήνα", "ειδική περίσταση"],
      priority: "low" as const,
      status: "wishlist" as const,
      addedDate: new Date("2024-01-20")
    }
  ]);

  const categories = [
    { title: "Βιβλία", description: "Για ανάγνωση", icon: "books" as const, count: items.filter(i => i.category === "Βιβλία").length },
    { title: "Σειρές", description: "Watchlist", icon: "series" as const, count: items.filter(i => i.category === "Σειρές").length },
    { title: "Εστιατόρια", description: "Για δοκιμή", icon: "restaurants" as const, count: items.filter(i => i.category === "Εστιατόρια").length },
    { title: "Podcasts", description: "Για άκουσμα", icon: "music" as const, count: items.filter(i => i.category === "Podcasts").length },
    { title: "Wishlist", description: "Θέλω να αγοράσω", icon: "wishlist" as const, count: items.filter(i => i.category === "Wishlist").length },
    { title: "Προϊόντα", description: "Γενικά items", icon: "products" as const, count: items.filter(i => i.category === "Προϊόντα").length },
  ];

  const handleAddItem = (newItem: any) => {
    setItems([newItem, ...items]);
  };

  const handleDeleteItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  const filteredItems = items.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = !selectedCategory || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative h-80 bg-gradient-hero overflow-hidden">
        <img 
          src={heroShelf} 
          alt="MyShelf Hero" 
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        />
        <div className="relative z-10 container mx-auto px-4 h-full flex items-center">
          <div className="max-w-2xl">
            <h1 className="text-5xl font-bold text-white mb-4 animate-fade-in">
              MyShelf
            </h1>
            <p className="text-xl text-white/90 mb-6 animate-fade-in">
              Το ψηφιακό ράφι της ζωής σου. Οργάνωσε και θυμήσου ό,τι αγαπάς.
            </p>
            <div className="flex gap-4 animate-fade-in">
              <AddItemDialog onAdd={handleAddItem} />
              <Button variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                <Sparkles className="h-4 w-4 mr-2" />
                Εξερεύνηση
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Search & Filter */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Αναζήτηση στο ράφι σου..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              <Button
                variant={selectedCategory === null ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(null)}
              >
                Όλα
              </Button>
              {categories.map((category) => (
                <Button
                  key={category.title}
                  variant={selectedCategory === category.title ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(selectedCategory === category.title ? null : category.title)}
                >
                  {category.title} ({category.count})
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Categories Overview */}
        {!selectedCategory && !searchQuery && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
              <BookOpen className="h-6 w-6" />
              Τα Ράφια σου
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.map((category) => (
                <ShelfCategory
                  key={category.title}
                  title={category.title}
                  description={category.description}
                  icon={category.icon}
                  itemCount={category.count}
                  onClick={() => setSelectedCategory(category.title)}
                />
              ))}
            </div>
          </div>
        )}

        {/* Items Display */}
        {(selectedCategory || searchQuery) && (
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-foreground">
                {selectedCategory ? `${selectedCategory}` : 'Αποτελέσματα Αναζήτησης'}
                <Badge variant="secondary" className="ml-2">
                  {filteredItems.length}
                </Badge>
              </h2>
              {selectedCategory && (
                <Button
                  variant="outline"
                  onClick={() => setSelectedCategory(null)}
                >
                  Πίσω στα Ράφια
                </Button>
              )}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredItems.map((item) => (
                <ShelfCard
                  key={item.id}
                  item={item}
                  onDelete={handleDeleteItem}
                />
              ))}
            </div>

            {filteredItems.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg mb-4">
                  Δεν βρέθηκαν αντικείμενα
                </p>
                <AddItemDialog 
                  onAdd={handleAddItem}
                  trigger={
                    <Button>
                      <BookOpen className="h-4 w-4 mr-2" />
                      Προσθήκη πρώτου αντικειμένου
                    </Button>
                  }
                />
              </div>
            )}
          </div>
        )}

        {/* Recent Items */}
        {!selectedCategory && !searchQuery && (
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-6">
              Πρόσφατα Προστεθέντα
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {items.slice(0, 8).map((item) => (
                <ShelfCard
                  key={item.id}
                  item={item}
                  onDelete={handleDeleteItem}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
