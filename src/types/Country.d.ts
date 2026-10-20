
type Country = {
name: string;
region: string;
capital?: string;
flags: Flag
population: number;
area?: number;
}

type Flag = {
    png: string;
    svg: string;
}