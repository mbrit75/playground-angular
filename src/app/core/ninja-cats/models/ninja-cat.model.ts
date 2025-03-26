export interface NinjaCat {
  id: string;
  name: string;
  age: number;
  breed: string;
  color: 'black' | 'white' | 'orange' | 'gray' | 'brown';
  personality: 'playful' | 'curious' | 'sassy' | 'chill' | 'adventurous';
  weapon: 'nunchaku' | 'katana' | 'shuriken' | 'bo staff' | 'ninja stars';
}
